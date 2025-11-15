from loguru import logger

# simple console logger setup
logger.remove()
logger.add(lambda msg: print(msg, end=""))
