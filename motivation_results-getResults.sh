#!/usr/bin/env sh
pushd /Users/andesgomez/Documents/Stanford/Spring2014-Masters/Psych241_Comp_Cog_Soc/aws-mturk-clt-1.3.1/bin
./getResults.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 -successfile /Users/andesgomez/Documents/Stanford/Spring2014-Masters/Psych241_Comp_Cog_Soc/project/motivated_inference/motivation_results.success -outputfile /Users/andesgomez/Documents/Stanford/Spring2014-Masters/Psych241_Comp_Cog_Soc/project/motivated_inference/motivation_results.results.tsv
popd