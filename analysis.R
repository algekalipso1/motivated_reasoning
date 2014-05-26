
first_batch = read.csv("motivation_results_first_study.csv",header=TRUE, sep="\t")
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


summary(aov(Answer.DW_strength ~ Answer.evidence_condition + as.factor(Answer.competition_condition), data = first_batch_c))
summary(aov(Answer.strength_of_average_player ~ Answer.evidence_condition + as.factor(Answer.competition_condition), data = first_batch_c))
summary(aov(Answer.role_of_luck_in_game ~ Answer.evidence_condition + as.factor(Answer.competition_condition), data = first_batch_c))
summary(aov(Answer.expectation_of_winning ~ Answer.evidence_condition + as.factor(Answer.competition_condition), data = first_batch_c))



summary(glm(Answer.expectation_of_winning ~ Answer.DW_strength + Answer.evidence_condition + as.factor(Answer.competition_condition) + Answer.strength_of_average_player + Answer.role_of_luck_in_game, data = first_batch_c))
summary(glm(Answer.DW_strength ~ Answer.expectation_of_winning + Answer.evidence_condition + as.factor(Answer.competition_condition) + Answer.strength_of_average_player + Answer.role_of_luck_in_game, data = first_batch))




### For later, graphics

library(plyr)
library(reshape2)
library(ggplot2)
library(binom)


md <- melt(patch_compliant, measure.vars = c("odd_one","twin_1","twin_2"), variable.name="object", value.name="chosen")
ms <- ddply(md, .(object, Answer.item), #Answer.item, 
            summarise, 
            c = mean(chosen),
            n = sum(chosen), 
            l = length(chosen),
            sdc = sd(chosen),
            c.cih = c + (sdc/l^.5),
            c.cil = c - (sdc/l^.5))


ms$item <- factor(ms$Answer.item)
levels(ms$item) <- c("boat","friend", "pizza", "snowman", "sundae", "Christmas tree")

ggplot(ms, aes(x= item, y=c, fill=object)) + 
  geom_bar(position=position_dodge()) + 
  geom_linerange(aes(ymin=c.cil,ymax=c.cih), 
                 position=position_dodge(width=.9)) + 
  ylab("Probability of choosing")

head(patch_compliant)

ms <- ddply(patch_compliant, .(Answer.linguistic_framing_condition,Answer.item),
            function(x) {
              y <- data.frame(choice=c("odd_one","twin_1","twin_2"),
                              proportion=c(mean(x$odd_one),mean(x$twin_1),mean(x$twin_2)))
              return(y)
            })

ms$frame <- factor(ms$Answer.linguistic_framing_condition)
levels(ms$frame) <- c("patch","word")
ms$item <- factor(ms$Answer.item)

qplot(item, proportion, fill=choice, facets = . ~ frame, 
      geom="bar",
      data=ms)

patch_table <- aggregate(cbind(odd_one,
                               twin_1,
                               twin_2) ~ 
                           Answer.linguistic_framing_condition , data=patch_compliant, sum)
md <- melt(patch_table, id.vars=c("Answer.item","Answer.linguistic_framing_condition"))


