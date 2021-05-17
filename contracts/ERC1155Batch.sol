// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC1155Batch is ERC1155, ERC1155Holder {
    IERC1155 public self;
    address public admin;
    string public name;
    string public symbol;
    string public metadata;

    modifier onlyAdmin {
        require(admin == msg.sender, "Only Parent allowed");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _metadata,
        address _admin
    ) ERC1155("") {
        name = _name;
        symbol = _symbol;
        metadata = _metadata;
        admin = _admin;
        self = IERC1155(address(this));
    }

    function mintTransfer(
        address[] memory _to,
        uint256[] memory _ids,
        uint256[] memory _values,
        bytes memory _data
    ) public onlyAdmin {
        _mintBatch(address(this), _ids, _values, _data);
        for (uint256 i = 0; i < _to.length; i++) {
            self.safeTransferFrom(
                address(this),
                _to[i],
                _ids[i],
                _values[i],
                _data
            );
        }
    }

    function batchMint(
        address[] memory _to,
        uint256[] memory _ids,
        uint256[] memory _values,
        bytes memory _data
    ) public onlyAdmin {
        for (uint256 i = 0; i < _to.length; i++) {
            _mint(_to[i], _ids[i], _values[i], _data);
        }
    }

    function updateMetadata(string memory _metadata) public onlyAdmin {
        metadata = _metadata;
    }

    function uri(uint256 _id) public view override returns (string memory) {
        return string(abi.encodePacked(metadata));
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155Receiver)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
