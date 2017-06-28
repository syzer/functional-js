package main

import (
	"fmt"
)

func main() {
	var i, j int
	var denominators string

	fmt.Scanf("%d %d", &i, &j)
	fmt.Scanln(&denominators)
	fmt.Println(denominators)
}

func countChange2(amount int) int64 {
	ways := make([]int64, amount+1)
	ways[0] = 1
	for _, coin := range []int{100, 50, 25, 10, 5, 1} {
		for j := coin; j <= amount; j++ {
			ways[j] += ways[j-coin]
		}
	}
	return ways[amount]
}