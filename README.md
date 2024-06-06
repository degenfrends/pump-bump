# Pump Bump Bot

💊 A free to use bumping/bump bot for pump.fun

![Static Badge](https://img.shields.io/badge/degen-100%25-pink)
![X (formerly Twitter) URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Fx.com%2Fkryptobrah&label=Twitter%2FX)

> [!WARNING] 
> Do not use your main wallet with this bot, since you have to expose your private key to your command line and if your computer gets/is compromissed, attackers can read your private key from the command line history.

## Installation
If you have absolutely no idea about all these technologies, ask ChatGPT what it is and how to install it on your operating system.
Install NodeJS Version >=20.
Download the ZIP file, or clone the repository.

## Configuration
Change the name of the .env.example file to .env and open the file in the editor of your choice.
The settings are documented, so it shouldn't be a problem for you to set it up as you wish.

```python
# The amount in Solana for which tokens are bought in each transaction
BUY_AMOUNT=0.0001
# The time interval in seconds in which tokens are bought
BUY_INTERVAL=15
# Treshold when the tokens are sold. to not crash the chart too much.
SELL_TRESHOLD=0.2
# The amount in Solana you want to add as priorioty fee for each transaction.
PRIORITY_FEE=0
# Slipage in decimals. 0.1 = 10%
SLIPPAGE=0.25
```

Save the .env file.

## Run the bot
