# Web-Based Stock Tracker

## Overview
This web-based stock tracker provides users with various features to gather and analyze financial data, including stock prices, options chains, and economic indicators from the Federal Reserve.

## Main Features

### 1. Get Data
#### 1.1 Get Stock Data
Allows users to retrieve real-time stock data for a specific ticker symbol.

**Usage:**
```bash
--get STOCK AAPL
```
This command fetches the current stock data for Apple (AAPL).

#### 1.2 Get Options Chain
Enables users to access the options chain for a particular stock and expiration date.

**Usage:**
```bash
--get OPTION CHAIN AAPL 2024-01-12
```
This command retrieves the options chain for Apple expiring on January 12, 2024.

#### 1.3 Get Data from the Federal Reserve
Provides access to economic data from the Federal Reserve.

**Usage:**
```bash
--get ECON risk_free_rate
```
This command fetches the risk-free interest rate, often represented by the 10-year Treasury yield.

### 2. Calculators
#### 2.1 Get Expected Option Calculator
Helps users estimate expected option prices based on various factors.

**Usage:**
```bash
--calculator EXPECTED OPTION
```
This command launches the expected option calculator.

#### 2.2 Delta + Gamma Hedge Calculator
Assists users in calculating delta and gamma for hedging purposes.

**Usage:**
```bash
--calculator DELTA GAMMA HEDGE
```
This command opens the Delta + Gamma Hedge Calculator.

#### 2.3 Profit with Margin Calculator
Allows users to calculate potential profits considering margin trading.

**Usage:**
```bash
--calculator PROFIT WITH MARGIN
```
This command initiates the Profit with Margin Calculator.

# How to Use Features

## Get Stock Price
To get the stock price for a specific ticker (e.g., AAPL), use the following command:
```bash
--get STOCK AAPL
```

## Options Chain
To retrieve the options chain for a particular stock with a specific expiration date (e.g., AAPL expiring on 2024-01-12), use:
```bash
--get OPTION CHAIN AAPL 2024-01-12
```

## Get Greeks (Delta and Gamma)
To get the delta and gamma for a specific option (e.g., AAPL240112C00060000), use:
```bash
--get OPTION GREEKS AAPL240112C00060000
```

## Risk-Free Interest Rate
To obtain the risk-free interest rate (10-year Treasury yield), use:
```bash
--get ECON risk_free_interest
```

## Calculators
To use the various calculators, use the following commands:
- Expected Option Calculator:
  ```bash
  --calculate OPTION PNL AAPL240112C00060000 180 200 5
  ```

This calculator will use a starting price + end price and a step to measure profit or loss at every step. 

- Delta + Gamma Hedge Calculator:
  ```bash
  --calculator DELTA GAMMA HEDGE
  ```

- Profit with Margin Calculator:
  ```bash
  --calculator PROFIT WITH MARGIN
  ```


