import scipy as sp
import numpy as np
import scipy.stats
from scikits import bootstrap
import sys

conditions = int(sys.argv[1])
queries = int(sys.argv[2])
infile = sys.argv[3]

def mean_confidence_interval(data, confidence=0.95):
    a = 1.0*np.array(data)
    n = len(a)
    m, se = np.mean(a), scipy.stats.sem(a)
    h = se * sp.stats.t._ppf((1+confidence)/2., n-1)
    return m, m-h, m+h

rnm = infile
rg = open(rnm)
line = rg.readline()
rg.close()
line1 = line[:-4].split(')) ')
res = []
n_samples = len(line1[0].split(') (')[0].split(' '))
fnl = np.zeros((queries,conditions,n_samples))
for a,i in enumerate(line1): 
    for b,j in enumerate(i.split(') (')): # conditions
        fnl[a,b,:] = np.array(j.translate(None,'(').split(' ')) #samples


fnlc = np.zeros((fnl.shape[0:2]))
fnlc = []

# organize as 1-6 Strength, 7-12 Luck
for a in range(queries):
    for b in range(conditions):
        fnlc.append(bootstrap.ci(fnl[a,b]))

np.savetxt((rnm[:-8]+'_95ci.csv'), fnlc, delimiter=',')
