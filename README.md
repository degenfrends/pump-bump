# Pump Bump - A pump.fun bumping bot

💊 A free to use bumping/bump bot for pump.fun! [join the discord](https://discord.gg/m8rDJwzqRP), frend!

![Static Badge](https://img.shields.io/badge/degen-100%25-pink)
![X (formerly Twitter) URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Fx.com%2Fkryptobrah&label=Twitter%2FX)

> [!CAUTION] 
> Do not use your main wallet with this bot, since you have to expose your private key to your command line and if your computer gets/is compromissed, attackers can read your private key from the command line history.

> [!CAUTION] 
> If you somehow lose your money while using this bot, it is not our fault. We use this bot ourselves in exact this version and we do our best to provide a functioning bot, but in any case of malfunctioning or misonfiguration it is possible to lose your money. So be careful and check always if you got everything correct, before you start the bot!

## Requirements
You need a fresh Solana wallet with not more than what you want to use for bumping! This is important, since you have to expose your private key to your command line and if your computer gets/is compromissed, attackers can read your private key from the command line history.

You need to export the private key of that Solana wallet.

You need to have NodeJS Version >= 20 installed.

[Download NodeJS here](https://nodejs.org/) for your operating system and run the installer!

> [!TIP] 
> If you have problems to understand all of this, [join the discord](https://discord.gg/m8rDJwzqRP)!

## Installation
[Download the ZIP file](https://github.com/degenfrends/pump-bump/archive/refs/heads/main.zip) and unpack it, or clone the repository.

```bash
git clone https://github.com/degenfrends/pump-bump.git pump-bump
```
## Configuration
Go to the directory in which you unpacked the zip or cloned the repository to.
Change the name of the .env.example file to .env and open the file in the editor of your choice.
```bash
cd pump-bump
mv .env.example .env
```
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
To run the bot, you need your bumping wallet address, the private key of your bumping wallet and the token address of the token you want to bump.
Open your console/command line/terminal and go to the directory in which you have unpacked or cloned the repository.
First test if everything is working as expected with the argument --transactionMode=0 the transaction will not be really executed, instead it is only simmulated.
```bash
node dist/index.js --privateKey=REPLACE_WITH_PRIVATE_KEY --walletAddress=REPLACE_WITH_WALLET_ADDRESS --tokenAddress=REPLACE_WITH_TOKEN_ADDRESS --transactionMode=0
```

If there are no errors thrown and you are happy with your settings, you can run the bot now.
```bash
node dist/index.js --privateKey=REPLACE_WITH_PRIVATE_KEY --walletAddress=REPLACE_WITH_WALLET_ADDRESS --tokenAddress=REPLACE_WITH_TOKEN_ADDRESS --transactionMode=1
```

To stop it press crtl+c in the command line.

> [!TIP] 
> If you run into any errors, open an issue here, or [join the discord](https://discord.gg/m8rDJwzqRP).
