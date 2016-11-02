# l = [1, 2, 4, 3, 99, 98, 7]
# l = [2, 5, 3, 1]
l = [3, 1, 2, 5, 4]
s = sorted(l)
si = 0
for item in l:
    if item == s[si]:
        si += 1
print (len(l) - si)