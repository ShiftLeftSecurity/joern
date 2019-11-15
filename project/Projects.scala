import sbt._

object Projects {
  lazy val joerncli = project.in(file("joern-cli"))
  lazy val joernserver = project.in(file("joern-server"))
  lazy val joernscripts = project.in(file("joern-scripts"))
}
