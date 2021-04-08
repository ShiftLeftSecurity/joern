#!/bin/bash
set -e #stop on error

echo "testing schema extender"
set -x #verbose on

./schema-extender.sh
# we should now be able to use our new `EXAMPLE_NODE` node
echo 'assert(nodes.ExampleNode.Label == "EXAMPLE_NODE")
assert(nodes.ExampleNode.PropertyNames.all.contains("EXAMPLE_PROPERTY"))' > scripts/SchemaExtenderTest.sc
./joern --script scripts/SchemaExtenderTest.sc

