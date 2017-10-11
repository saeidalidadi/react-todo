console.time('start');

let sum = 0;
for(let i=0; i <= 10000; ++i) {
	for(let k =0; k< i; ++k) {
		sum = sum+1;
	}
}

console.timeEnd('start');