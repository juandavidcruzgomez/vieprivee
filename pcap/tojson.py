#!/usr/bin/python

#

import sys
import json

#Protocol Number 6 is TCP, 17 is UDP

result = {}

for line in sys.stdin:
  split = line[:-1].split(' ')
  #print split
  origin = split[0]
  if origin not in result:
    result[origin] = {}
    result[origin]['origin'] = origin
    result[origin]['content'] = []
  if split[10][1:-1] != '-':
    if split[10][1:-1] not in result[origin]['content']:
      result[origin]['content'].append(split[10][1:-1])
  elif split[6][1:-1] != '-':
    if split[6][1:-1] not in result[origin]['content']:
      result[origin]['content'].append(split[6][1:-1])

print json.dumps(result, indent=4)
