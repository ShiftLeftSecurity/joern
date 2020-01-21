import io.shiftleft.codepropertygraph.Cpg
import io.shiftleft.codepropertygraph.generated.nodes.{Call, Expression, Identifier, Literal}
import io.shiftleft.codepropertygraph.generated.{Operators, nodes}
import io.shiftleft.semanticcpg.language._
import io.shiftleft.semanticcpg.language.operatorextension._

private def expressionIsPointer(argument: Expression, isSubExpression: Boolean = false): Boolean = {
  argument match {
    case identifier: Identifier =>
      identifier.typeFullName.endsWith("*") || identifier.typeFullName.endsWith("]")
    case call: Call if call.name == Operators.indirectFieldAccess => // On '->', only check the selected field.
      expressionIsPointer(call.start.argument.l.last, isSubExpression = true)
    case call: Call => // On normal nested call, check all arguments are also pointers.
      call.name == Operators.addressOf || call.start.argument.l.forall { arg =>
        expressionIsPointer(arg, isSubExpression = true)
      }
    case _: Literal if isSubExpression => true // Lone literals are not counted.
    case _ => false
  }
}

@main def main(): List[nodes.Call] = {
  (cpg: Cpg).assignment
    .where(_.source.isInstanceOf[Call])
    .where(_.target.isInstanceOf[Identifier])
    .where { assignment =>
      val target = assignment.target.asInstanceOf[Identifier]
      val source = assignment.source.asInstanceOf[Call]

      source.name.contains(Operators.subtraction) &&
      target.typeFullName == "int" &&
        expressionIsPointer(source)
    }
    .l
}