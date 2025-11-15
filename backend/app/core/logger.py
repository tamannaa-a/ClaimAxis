from loguru import logger
logger.remove()
logger.add(lambda m: print(m, end=""))
