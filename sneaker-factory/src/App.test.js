import { render, screen, fireEvent } from '@testing-library/react';
import { ethers } from 'ethers';
import App from './App';

jest.mock('ethers');

const mockFactory = {
  createSneakerNFT: jest.fn().mockResolvedValue({
    wait: () => Promise.resolve(),
  }),
  getNFTContracts: jest.fn().mockResolvedValue(['0xContract1', '0xContract2']),
};

ethers.Contract.mockImplementation(() => mockFactory);
ethers.providers.Web3Provider.mockReturnValue({ getSigner: () => 'signer' });

describe('Sneaker Factory App', () => {
  test('renders the main elements', () => {
    render(<App />);

    const title = screen.getByText(/Sneaker Factory/i);
    expect(title).toBeInTheDocument();

    const createButton = screen.getByText(/Create Sneaker NFT Contract/i);
    expect(createButton).toBeInTheDocument();

    const getContractsButton = screen.getByText(/Get NFT Contracts/i);
    expect(getContractsButton).toBeInTheDocument();
  });

  test('creates a new Sneaker NFT contract', async () => {
    render(<App />);

    const createButton = screen.getByText(/Create Sneaker NFT Contract/i);
    fireEvent.click(createButton);

    expect(mockFactory.createSneakerNFT).toHaveBeenCalled();
  });

  test('fetches the list of NFT contracts', async () => {
    render(<App />);

    const getContractsButton = screen.getByText(/Get NFT Contracts/i);
    fireEvent.click(getContractsButton);

    await screen.findByText(/NFT Contracts:/i);

    expect(mockFactory.getNFTContracts).toHaveBeenCalled();
    expect(screen.getByText(/0xContract1/i)).toBeInTheDocument();
    expect(screen.getByText(/0xContract2/i)).toBeInTheDocument();
  });
});
