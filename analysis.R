### BOOTSTRAPPING precode:

library(reshape2)
library(plyr)
install.packages("bootstrap")
library(bootstrap)
theta <- function(x,xdata,na.rm=T) {mean(xdata[x],na.rm=na.rm)}
ci.low <- function(x,na.rm=T) {
  mean(x,na.rm=na.rm) - quantile(bootstrap(1:length(x),1000,theta,x,na.rm=na.rm)$thetastar,.025,na.rm=na.rm)}
ci.high <- function(x,na.rm=T) {
  quantile(bootstrap(1:length(x),1000,theta,x,na.rm=na.rm)$thetastar,.975,na.rm=na.rm) - mean(x,na.rm=na.rm)}

agrci <- function(x){
  agr = aggregate(value ~ team.cond + evidence.cond + question, data=x, FUN=mean)
  agr$CILow = aggregate(value ~ team.cond + evidence.cond + question, data=x, FUN=ci.low)$value
  agr$CIHigh = aggregate(value ~ team.cond + evidence.cond + question, data=x, FUN=ci.high)$value
  agr$YMin = agr$value - agr$CILow
  agr$YMax = agr$value + agr$CIHigh
  return(agr)
}








first_batch = read.csv("motivation_results_one_point_five.csv",header=TRUE, sep="\t")
head(first_batch)
colnames(first_batch)

cbind(first_batch$Answer.strength_of_average_player,
      first_batch$Answer.DW_strength,
      first_batch$Answer.evidence_condition,
      first_batch$Answer.competition_condition)


first_batch$Answer.strength_of_average_player



# Do time processing
start <- first_batch$assignmentaccepttime
end <- first_batch$assignmentsubmittime

number_of_subjects = length(start)


study_duration = 1:number_of_subjects

for (i in 1:number_of_subjects) {
  stringed_start = strsplit(toString(start[i]), " ", fixed = TRUE)
  within_day_start = stringed_start[[1]][4]
  decomposed_s = strsplit(within_day_start, ":", fixed = TRUE)
  start_time = as.numeric(decomposed_s[[1]][1]) * 3600 + as.numeric(decomposed_s[[1]][2]) * 60 +  as.numeric(decomposed_s[[1]][3])
  
  stringed_end = strsplit(toString(end[i]), " ", fixed = TRUE)
  within_day_end = stringed_end[[1]][4]
  decomposed_e = strsplit(within_day_end, ":", fixed = TRUE)
  end_time = as.numeric(decomposed_e[[1]][1]) * 3600 + as.numeric(decomposed_e[[1]][2]) * 60 +  as.numeric(decomposed_e[[1]][3])
  
  study_duration[i] = end_time - start_time
}

first_batch$study_time = study_duration


first_batch$Answer.competition_condition
first_batch$Answer.evidence_condition


# Subset of compliant / participants who attended to stimuli
first_batch$evidence_compliant = (first_batch$Answer.evidence_condition == 1 & first_batch$Answer.familiarization_check == '"2"' & first_batch$Answer.DW_accuracy_check == '"2"') |
  (first_batch$Answer.evidence_condition == 0 & first_batch$Answer.familiarization_check == '"8"' & first_batch$Answer.DW_accuracy_check == '"8"')

first_batch$competition_condition_compliant = (first_batch$Answer.competition_condition == 1 & first_batch$Answer.DW_check == '"partner"') |
  (first_batch$Answer.competition_condition == 2 & first_batch$Answer.DW_check == '"opponent"') |
  (first_batch$Answer.competition_condition == 0 & first_batch$Answer.DW_check == '"opponent"')


first_batch$compliant = first_batch$evidence_compliant & first_batch$competition_condition_compliant
first_batch_c = subset(first_batch, first_batch$evidence_compliant)

# without the neither opponent nor teammate
first_batch_c$match =  first_batch_c$Answer.competition_condition == 1 | first_batch_c$Answer.competition_condition == 2
first_batch_DW_relevant = subset(first_batch_c, first_batch_c$match)

# High evidence == 0, low evidence == 1
# Control == 0, team == 1, opponent == 2

Answer.DW_strength
Answer.strength_of_average_player
Answer.role_of_luck_in_game
Answer.expectation_of_winning

table_by_competition <- aggregate(cbind(Answer.DW_strength,
                                   Answer.strength_of_average_player,
                                   Answer.role_of_luck_in_game,
                                   Answer.expectation_of_winning) ~ 
                             Answer.competition_condition, data=first_batch_c, mean)

table_by_evidence <- aggregate(cbind(Answer.DW_strength,
                                        Answer.strength_of_average_player,
                                        Answer.role_of_luck_in_game,
                                        Answer.expectation_of_winning) ~ 
                                  Answer.evidence_condition, data=first_batch_c, mean)

table_by_both <- aggregate(cbind(Answer.DW_strength,
                                     Answer.strength_of_average_player,
                                     Answer.role_of_luck_in_game,
                                     Answer.expectation_of_winning) ~ 
                                 Answer.evidence_condition + Answer.competition_condition, data=first_batch_c, mean)


summary(aov(Answer.DW_strength ~ Answer.evidence_condition * as.factor(Answer.competition_condition), data = first_batch_c))
summary(aov(Answer.strength_of_average_player ~ Answer.evidence_condition + as.factor(Answer.competition_condition), data = first_batch_c))
summary(aov(Answer.role_of_luck_in_game ~ Answer.evidence_condition + as.factor(Answer.competition_condition), data = first_batch_c))
summary(aov(Answer.expectation_of_winning ~ Answer.evidence_condition + as.factor(Answer.competition_condition), data = first_batch_c))


# Multiple regression of DW strength from everything else
summary(glm(Answer.expectation_of_winning ~ Answer.DW_strength + Answer.evidence_condition + as.factor(Answer.competition_condition) + Answer.strength_of_average_player + Answer.role_of_luck_in_game, data = first_batch_c))
summary(glm(Answer.DW_strength ~ study_time +  Answer.evidence_condition + as.factor(Answer.competition_condition) + Answer.expectation_of_winning +  Answer.strength_of_average_player + Answer.role_of_luck_in_game , data = first_batch_c))


# Excluding the control condition:
summary(glm(Answer.DW_strength ~  Answer.evidence_condition + Answer.expectation_of_winning + as.factor(Answer.competition_condition) + Answer.strength_of_average_player + Answer.role_of_luck_in_game , data = first_batch_DW_relevant))

hist(first_batch_c$Answer.strength_of_average_player)







### FOR GRAPHICS!!!

library(plyr)
library(reshape2)
library(ggplot2)
library(binom)

## Only on evidence:

md <- melt(first_batch_c, measure.vars = c("Answer.DW_strength","Answer.expectation_of_winning","Answer.strength_of_average_player", "Answer.role_of_luck_in_game"), variable.name="object", value.name="chosen")
ms <- ddply(md, .(object, Answer.evidence_condition), # Evidence
            summarise, 
            c = mean(chosen),
            n = sum(chosen), 
            l = length(chosen),
            sdc = sd(chosen),
            c.cih = c + ci.high(chosen),
            c.cil = c - ci.low(chosen))


ms$evidence <- factor(ms$Answer.evidence_condition)
levels(ms$evidence) <- c("high", "low")

ggplot(ms, aes(x= evidence, y=c, fill=object)) + 
  geom_bar(position=position_dodge()) + 
  geom_linerange(aes(ymin=c.cil,ymax=c.cih), 
                 position=position_dodge(width=.9)) + 
  ylab("Slider value")






## Only on competition:

md <- melt(first_batch_c, measure.vars = c("Answer.DW_strength","Answer.expectation_of_winning","Answer.strength_of_average_player", "Answer.role_of_luck_in_game"), variable.name="object", value.name="chosen")
ms <- ddply(md, .(object, Answer.competition_condition), # Evidence
            summarise, 
            c = mean(chosen),
            n = sum(chosen), 
            l = length(chosen),
            sdc = sd(chosen),
            c.cih = c + ci.high(chosen),
            c.cil = c - ci.low(chosen))


ms$competition <- factor(ms$Answer.competition_condition)
levels(ms$competition) <- c("control", "partner", "opponent")

ggplot(ms, aes(x= competition, y=c, fill=object)) + 
  geom_bar(position=position_dodge()) + 
  geom_linerange(aes(ymin=c.cil,ymax=c.cih), 
                 position=position_dodge(width=.9)) + 
  ylab("Slider value")




##################### evidence + competition

md <- melt(first_batch_c, measure.vars = c("Answer.DW_strength","Answer.expectation_of_winning","Answer.strength_of_average_player", "Answer.role_of_luck_in_game"), variable.name="object", value.name="chosen")
ms <- ddply(md, .(object, Answer.evidence_condition, Answer.competition_condition), # Evidence + competition
            summarise, 
            c = mean(chosen),
            n = sum(chosen), 
            l = length(chosen),
            sdc = sd(chosen),
            c.cih = c + ci.high(chosen),
            c.cil = c - ci.low(chosen))


ms$evidence <- factor(ms$Answer.evidence_condition)
levels(ms$evidence) <- c("high", "low")
ms$competition <- factor(ms$Answer.competition_condition)
levels(ms$competition) <- c("control", "partner", "opponent")

ms$conditions_combined <- factor(10* ms$Answer.evidence_condition  + ms$Answer.competition_condition)
levels(ms$conditions_combined) <- c("+ evidence, control", "+ evidence, partner", "+ eviedence, opponent","- evidence, control", "- evidence, partner", "- eviedence, opponent")

ggplot(ms, aes(x= conditions_combined, y=c, fill=object)) + 
  geom_bar(position=position_dodge()) + 
  geom_linerange(aes(ymin=c.cil,ymax=c.cih), 
                 position=position_dodge(width=.9)) + 
  ylab("Slider value")



write.csv(ms, file = "breakdown_by_competition_n_140.csv")





##### BOOTSTRAPPING


library(ggplot2)

CILow = ci.high(first_batch_c$Answer.DW_strength)
