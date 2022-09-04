import { Dropdown } from 'react-bootstrap';

interface SortDropdownProps {
  sortedByVotes: boolean;
  setSortedByVotes: (state: boolean) => void;
  className?: string;
}

export default function SortDropdown(props: SortDropdownProps) {
  const { sortedByVotes, setSortedByVotes, className } = props;

  return (
    <Dropdown className={className}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {sortedByVotes ? 'Score' : 'Newest'}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setSortedByVotes(false)}>
          Newest
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSortedByVotes(true)}>
          Score
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
