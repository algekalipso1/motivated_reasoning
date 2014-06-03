# from church_parse we get bootstrapped 95% confidence intervals 
# now to plot them

# rows 1-6 = STRENGTH
# rows 7-12 = LUCK
# i,ii,iii,iv,... = 2partner,2opponent,2neither,8partner,...
library(ggplot2)
numqueries=4
numcond=6
setwd('/Users/mht/Documents/class/socmods/motivated_reasoning/models')
ci95s= read.csv('modelOS_4test_1_opt1_n1000_95ci.csv',header=F)
ci95s= read.csv('modelO_4q_opt1_n1000_95ci.csv',header=F)
names(ci95s)<-c('lbound','ubound')
ci95s$mean = (ci95s$ubound+ci95s$lbound)/2
#ci95s$measurement = c(rep('st',6),rep('lu',6))
#ci95s$cond.ev = rep(c(rep('2',3),rep('8',3)),2)
ci95s$measurement = c(rep('stDW',numcond),rep('lu',numcond),rep('stOT',numcond),rep('pWin',numcond))
ci95s$cond.model = rep(c(rep('optimism',(numcond/2)),rep('strength',(numcond/2))),numqueries)
ci95s$cond.team = rep(c('partner','opponent','neither'),numqueries)
ci95s$cond.team<-factor(ci95s$cond.team,levels=c('partner','opponent','neither'))
ci95s$measurement<-factor(ci95s$measurement,
                          levels=c('stDW','stOT','lu','pWin'),
                          labels=c('target strength','average strength','luck in game','P(win)'))


ggplot(ci95s, aes(x=cond.model, y=mean,colour=cond.team,group=cond.team))+
  geom_point(position=position_dodge(width=0.5),size=2)+
  #geom_line()+#,stat='identity')+
  geom_errorbar(aes(ymin=lbound,ymax=ubound),width=0.4,alpha=1,position=position_dodge(width=0.5))+
    xlab("model")+
  ylab("percent endorsement")+
  facet_wrap(~measurement)+
  theme_bw()+
  theme(plot.title=element_text(size=20),
        axis.line = element_line(colour = "black"),
        axis.title.x = element_text(size=18),
        axis.title.y = element_text(size=18),
        axis.text.x = element_text(size=12),
        legend.text = element_text(size=18),
        legend.title = element_text(size=18),
        panel.grid.major = element_blank(),
        panel.grid.minor = element_blank(),
        strip.text.x = element_text(size=15),#, face="bold"),
        strip.text.y = element_text(size=15),#, face="bold"),
        strip.background = element_rect(colour="white", fill="white"))


dt = read.csv('../csv/breakdown_by_condition_study2_n48_competition_compliant.csv')
dt = read.csv('../csv/breakdown_by_competition_n_140.csv')
dt$evidence<-factor(dt$evidence,levels=c('low','high'))
dt$target<-factor(dt$competition,levels=c('partner','opponent','control'))
dt$question<-factor(dt$object,levels=c('Answer.DW_strength',"Answer.strength_of_average_player","Answer.role_of_luck_in_game","Answer.expectation_of_winning"),labels=c('target strength','average strength','role of luck','P(win)'))
dt$l
ggplot(dt, aes(x=competition, y=c,colour=target,group=target)) +   
  geom_point(position=position_dodge(width=0.4),size=2)+
  geom_errorbar(aes(ymin=c.cil,ymax=c.cih),width=0.4,alpha=1,
                position=position_dodge(width=0.4))+
  xlab("condition")+
  ylab("percent endorsement")+
  facet_wrap(~question)+
  theme_bw()+
  theme(plot.title=element_text(size=20),
        axis.line = element_line(colour = "black"),
        axis.title.x = element_text(size=18),
        axis.title.y = element_text(size=18),
        axis.text.x = element_text(size=12),
        legend.text = element_text(size=18),
        legend.title = element_text(size=18),
        panel.grid.major = element_blank(),
        panel.grid.minor = element_blank(),
        strip.text.x = element_text(size=15),#, face="bold"),
        strip.text.y = element_text(size=15),#, face="bold"),
        strip.background = element_rect(colour="white", fill="white"))

ggplot(dt, aes(x=evidence, y=c,colour=target,group=target)) +   
  geom_line(position=position_dodge(width=0.4))+
  geom_errorbar(aes(ymin=c.cil,ymax=c.cih),width=0.4,alpha=1,
                position=position_dodge(width=0.4))+
  xlab("condition")+
  ylab("percent endorsement")+
  facet_wrap(~question)+
  theme_bw()+
  theme(plot.title=element_text(size=20),
        axis.line = element_line(colour = "black"),
        axis.title.x = element_text(size=18),
        axis.title.y = element_text(size=18),
        axis.text.x = element_text(size=12),
        legend.text = element_text(size=18),
        legend.title = element_text(size=18),
        panel.grid.major = element_blank(),
        panel.grid.minor = element_blank(),
        strip.text.x = element_text(size=15),#, face="bold"),
        strip.text.y = element_text(size=15),#, face="bold"),
        strip.background = element_rect(colour="white", fill="white"))

