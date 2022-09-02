import { Dropdown } from 'react-bootstrap';

interface SortDropdownProps {
  sortedByVotes: boolean;
  setSortedByVotes: (state: boolean) => void;
}

export default function SortDropdown(props: SortDropdownProps) {
  const { sortedByVotes, setSortedByVotes } = props;

  return (
    <Dropdown>
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
