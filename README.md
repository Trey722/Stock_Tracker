# Overview
This is a web based stock tracker 

# Main features
1. Get Data
- Get Stock Data
- Get Options Chain
- Get Data from the Federal Reserve
2. Calcualtors
- Get expected option calcualtor
- Delta + Gamma Hedge Calculator
- Profit with margin calcualtor

# Use Features

## Get Stock Price
'''bash
--get STOCK AAPL 
'''
This will get the stock for the ticker which is currently AAPL or Apple 

## Options Chain
'''
--get OPTION CHAIN AAPL 2024-01-12
'''
This will get the Option Chain for Apple with expeiration date January 12, 2024. It goes date goes YYYY-MM-DD. 

## Get greeks such as delta and gamma 
'''bash
--get OPTION GREEKS AAPL240112C00060000	
'''

This will get the delta and gamma for apple stock that expries on Janaury 12 2024 with a strike price of 60. Option tickers go. 


## Risk Free Intrest Rate AKA 10 year Treasury Yield
'''
--get ECON risk_free_intrest
'''
This will get the risk free 



