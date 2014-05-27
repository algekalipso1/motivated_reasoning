# from church_parse we get bootstrapped 95% confidence intervals 
# now to plot them

# rows 1-6 = STRENGTH
# rows 7-12 = LUCK
# i,ii,iii,iv,... = 2partner,2opponent,2neither,8partner,...

ci95s= read.csv('modelO_opt0,75_n5._95ci.csv',header=F)
names(ci95s)<-c('lbound','ubound')
ci95s$mean = (ci95s$ubound+ci95s$lbound)/2
ci95s$measurement = c(rep('st',6),rep('lu',6))
ci95s$cond.ev = rep(c(rep('2',3),rep('8',3)),2)
ci95s$cond.team = rep(c('partner','opponent','neither'),4)



ggplot(ci95s, aes(x=cond.ev, y=mean,fill=cond.team)) +   
  geom_bar(position=position_dodge(),stat='identity')+
  geom_errorbar(aes(ymin=lbound,ymax=ubound),width=0.4,alpha=0.6,
                position=position_dodge(.9))+
  xlab("evidence condition")+
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