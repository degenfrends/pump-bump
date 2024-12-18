# Pump Bump - A pump.fun bumping bot

💊 A free to use bumping/bump bot for pump.fun! [join the discord](https://discord.gg/HUVAbet2Dp), frend!

![Static Badge](https://img.shields.io/badge/degen-100%25-pink)
![GitHub Repo stars](https://img.shields.io/github/stars/degenfrends/solana-rugchecker)
![X (formerly Twitter) URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Fx.com%2Fkryptobrah&label=Twitter%2FX)

__Advanced version of this bot for sale in [discord](https://discord.gg/HUVAbet2Dp)!__
* __Buy&Sell in same transaction__
* __Bump in random intervalls__
* __Bump for random amount__
* __Jito Bundles__
* __Stealth sells__
* __Multiple wallet support__
* __I can add any feature you like__

__Advanced pump.fun bundler for sale in [discord](https://discord.gg/HUVAbet2Dp)!__

> [!CAUTION] 
> Do not use your main wallet with this bot, since you have to expose your private key to your command line and if your computer gets/is compromissed, attackers can read your private key from the command line history or the environment variables.

> [!CAUTION] 
> If you somehow lose your money while using this bot, it is not our fault. We use this bot ourselves in exact this version and we do our best to provide a functioning bot, but in any case of malfunctioning or misonfiguration it is possible to lose your money. So be careful and check always if you got everything correct, before you start the bot!

## If you made some money off of this and you want to contribute to the ongoing development, you can send some SOL to this address: xe18XoG9HpgpmZ6C4GLAfnDtD7xGc6dEjen7NfF3V9g

## Requirements
You need a fresh Solana wallet with not more than what you want to use for bumping! This is important, since you have to expose your private key to your command line and if your computer gets/is compromissed, attackers can read your private key from the command line history or your environment variables.

You need to export the private key of that Solana wallet.

You need to have NodeJS Version >= 20 installed.

[Download NodeJS here](https://nodejs.org/) for your operating system and run the installer!

> [!TIP] 
> If you have problems to understand all of this, [join the discord](https://discord.gg/HUVAbet2Dp)!

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
# The amount in Solana you want to add as priorioty fee for each transaction.
PRIORITY_FEE=0.00003
# Slipage in decimals. 0.1 = 10%
SLIPPAGE=0.25
# The url to your solana node.
RPC_URL="https://api.mainnet-beta.solana.com"
# Your exported private key phrase
PRIVATE_KEY="1234abcde1234abcde12345abcde"
```

> [!CAUTION] 
> You need a rpc endpoint from helius, triton, quiknode or a better one. Free tiers will not land every transaction.

Save the .env file.

## Run the bot
To run the bot, you need your bumping wallet address, the private key of your bumping wallet and the token address of the token you want to bump.
Open your console/command line/terminal and go to the directory in which you have unpacked or cloned the repository and execute the following command.
```bash
node dist/index.js --privateKey=REPLACE_WITH_PRIVATE_KEY --walletAddress=REPLACE_WITH_WALLET_ADDRESS --tokenAddress=REPLACE_WITH_TOKEN_ADDRESS
```
If you save your private key in the .env file, you don't need to pass it as argument.
```bash
node dist/index.js --walletAddress=REPLACE_WITH_WALLET_ADDRESS --tokenAddress=REPLACE_WITH_TOKEN_ADDRESS
```

To stop it press crtl+c in the command line.

> [!TIP] 
> If you run into any errors, [open an issue here](https://github.com/degenfrends/pump-bump/issues/new), or [join the discord](https://discord.gg/HUVAbet2Dp).
