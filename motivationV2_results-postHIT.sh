#!/usr/bin/env sh
pushd /Applications/aws-mturk-clt-1.3.1/bin
./loadHITs.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 -label /Users/mht/Documents/class/socmods/motivated_reasoning//motivationV2_results -input /Users/mht/Documents/class/socmods/motivated_reasoning//motivationV2_results.input -question /Users/mht/Documents/class/socmods/motivated_reasoning//motivationV2_results.question -properties /Users/mht/Documents/class/socmods/motivated_reasoning//motivationV2_results.properties -maxhits 1
popd