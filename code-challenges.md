### Problem 1

Provide 3 unique implementations of the following function in JavaScript.

**Input**: `n` - any integer

_Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`_.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

```jsx
var sum_to_n_a = function(n) {
    // your code here
};

var sum_to_n_b = function(n) {
    // your code here
};

var sum_to_n_c = function(n) {
    // your code here
};
```


### Problem 2

Create a currency swap form based on the template provided in the folder. A user would use this form to swap assets from one currency to another.

_You may use any third party plugin, library, and/or framework for this problem._

1. You may add input validation/error messages to make the form interactive.
2. Your submission will be rated on its usage intuitiveness and visual attractiveness.
3. Show us your frontend development and design skills, feel free to totally disregard the provided files for this problem.
4. You may use this [repo](https://github.com/Switcheo/token-icons/tree/main/tokens) for token images, e.g. [SVG image](https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg).
5. You may use this [URL](https://interview.switcheo.com/prices.json) for token price information and to compute exchange rates (not every token has a price, those that do not can be omitted).

<aside>  
✨ Bonus: extra points if you use [Vite](https://vite.dev/) for this task!

</aside>

Please submit your solution using the files provided in the skeletal repo, including any additional files your solution may use.

Hint: feel free to simulate or mock interactions with a backend service, e.g. implement a loading indicator with a timeout delay for the submit button is good enough.


### Problem 3

List out the computational inefficiencies and anti-patterns found in the code block below.

1. This code block uses
    1. ReactJS with TypeScript.
    2. Functional components.
    3. React Hooks
2. You should also provide a refactored version of the code, but more points are awarded to accurately stating the issues and explaining correctly how to improve them.

```tsx
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}
```