import itertools
n= 6
# lst = [reduce(add,(i)) for i in itertools.product([0, 1], repeat=n)]

print(["".join(seq) for seq in itertools.product("01", repeat=32)])