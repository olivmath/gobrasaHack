"""
Automation for update debug section in front-end
"""
from dataclasses import dataclass, field
from json import dumps, load
from typing import List
import traceback


@dataclass
class Contract:
    """
    # Contract must have:
    - contractAddress: str
    - contractName: str
    - abi: list
    """

    name: str
    address: str
    abi: list = field(default_factory=list)


CONTRACT_SECUNDARY = "artifacts/DCCToken.sol/DCCToken.json"
DEBUG_DIR = "../ui/debug/generated/deployedContracts.ts"
PROD_DIR = "../ui/prod/services/deployedContracts.ts"

CHAIN_ID = 31337
CONTRACT_SCRIPT_NAME = "deploy.local.s.sol"
TRANSACTIONS_PATH = f"broadcast/{CONTRACT_SCRIPT_NAME}/{CHAIN_ID}/run-latest.json"


def abi_path(name) -> str:
    return f"artifacts/{name}.sol/{name}.json"


try:

    with open(TRANSACTIONS_PATH) as deployed_contracts:
        json_file = load(deployed_contracts)
        transactions = json_file["transactions"]
        contracts: List[Contract] = []

        for contract in transactions:
            if contract["transactionType"] == "CREATE":
                name, address = contract["contractName"], contract["contractAddress"]
                with open(abi_path(name)) as full_abi_json:
                    abi = load(full_abi_json)["abi"]
                    contracts.append(Contract(name, address, abi))

    with open(CONTRACT_SECUNDARY) as secondary_contract:
        json_file = load(secondary_contract)
        abi = json_file["abi"]
        contracts.append(Contract("DCCToken", contracts[0].address, abi))

    json_config = {
        CHAIN_ID: [{"name": "localhost", "chainId": str(CHAIN_ID), "contracts": {}}]
    }

    for contract in contracts:
        json_config[CHAIN_ID][0]["contracts"][contract.name] = {
            "address": contract.address,
            "abi": contract.abi,
        }

    typescript_content = f"const deployedContracts = {dumps(json_config)} as const; \n\n export default deployedContracts"

    with open(DEBUG_DIR, "w") as ts_file:
        ts_file.write(typescript_content)
        print(f"\033[32mSave ABI on {DEBUG_DIR} with Success!\033[0m")
    with open(PROD_DIR, "w") as ts_file:
        ts_file.write(typescript_content)
        print(f"\033[32mSave ABI on {PROD_DIR} with Success!\033[0m")
except Exception as e:
    print("\033[31mFailed on save ABI Artefacts\033[0m")
    traceback.print_exc()
