# Web-Based Stock Tracker

## Overview
This web-based stock tracker provides users with various features to gather and analyze financial data, including stock prices, options chains, and economic indicators from the Federal Reserve.

## Main Features


### 1. Get Data 

  1.1 Pull Stock Data
  1.2 Pull Options Chain
  1.3 Pull Treausry Yeilds 

### 2. Calculate 
  2.1 Calculate Options Profit of Calls and Puts
  2.2 Calcualte Profit Using Margin 
  2.33.1 Delta/Gamma Hedge calcualtor 
  
  


**Usage**
# Get Stock Price

```bash
--get STOCK AAPL
```
  This command fetches the stock price of whatever ticker you use. In this example we used Apple with AAPL 

# Get Options Chain 
```bash
--get OPTION CHAIN AAPL 2024-01-12
```
This command retrieves the options chain for Apple expiring on January 12, 2024. 
Both a date and ticker are required


# Get Greeks 
```bash
--get OPTION GREEKS AAPL240112C00060000
```

This will get delta and gamma for the option with a ticker of AAPL240112C00060000.

# Get risk_free_rate 
```bash
--get ECON risk_free_rate
```

This command fetches the risk-free interest rate, often represented by the 10-year Treasury yield.

# Options Calcualtor 

```bash
  --calculate OPTION PNL {OPTION_TICKER} {starting_price} {ending_price} {step}
  --calculate OPTION PNL AAPL240112C00060000 180 200 5
```

This takes a option_ticker + starting price + ending price + step and calcuates the profits between the two ranges using the step. It is reccoemmende to keep step abouve 1 for speed

#### 2.2 Delta + Gamma Hedge Calculator
Assists users in calculating delta and gamma for hedging purposes.

```bash
--calculate OPTION HEDGE {Quantity} {DELTA_OPTION1} {GAMMA_OPTION1} {DELTA_OPTION2} {GAMMA_OPTION2}
```
This will use the quantity and option 1 or the option you are writing + the option you are using to cancel. It will take these two numbers and callaucte the amount of option 2
you need to buy or sell short + stocks you need to buy or sell to nuetrilze your gamma + delta. 

```bash
--calculate OPTION HEDGE -10000 0.550 0.04400 0.270 0.03650
```

This will order you to buy the 12,055 of the second option and buy 2,245 shares of the underyling to nuertizle your exposure to small movements(delta) and exposure to large movements(gamma)

#### 2.3 Calcualte Profit with Margin 

Allows users to calculate potential profits considering margin trading.

**Usage:**
```bash
--calculate STOCK MARGIN {quantity} {underlying_buy_price} {margin_used} {start_price} {end_price} {step}
```

Example 
```bash
--calculate STOCK MARGIN 2 10 10 0 100  5
```

This will simmualte the profit you would make off of buying 1 share with $10 of margin and $10 of cash between the price ranges of 0-100 with a step of 5. 
