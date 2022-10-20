import React from "react";
import Button from "../../../components/Button/Button";
import { useWalletModal } from "../../WalletModal";
import { Login } from "../../WalletModal/types";

interface Props {
  account?: string;
  login: Login;
  logout: () => void;
}

const UserBlock: React.FC<Props> = ({ account, login, logout }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account);
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  return (
    <div>
      {account ? (
        <Button
          scale="md"
          variant="tertiary"
          style={{ background: "linear-gradient(45deg, #1fc7d4 , #7B60FD)", color: "white", height: "40px" }}
          onClick={() => {
            onPresentAccountModal();
          }}
        >
          {accountEllipsis}
        </Button>
      ) : (
        <Button
          scale="md"
          onClick={() => {
            onPresentConnectModal();
          }}
          style={{ background: "linear-gradient(45deg, #1fc7d4 , #7B60FD)", color: "white", height: "40px" }}
        >
          Connect
        </Button>
      )}
    </div>
  );
};

export default React.memo(
  UserBlock,
  (prevProps, nextProps) =>
    prevProps.account === nextProps.account &&
    prevProps.login === nextProps.login &&
    prevProps.logout === nextProps.logout
);
