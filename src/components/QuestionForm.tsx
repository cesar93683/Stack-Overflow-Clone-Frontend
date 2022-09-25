import { Alert, Button, CloseButton, Form } from 'react-bootstrap';
import SelectSearch, {
  fuzzySearch,
  SelectedOptionValue,
} from 'react-select-search';
import 'react-select-search/style.css';
import Content from './Content';
import LoadingSpinner from './LoadingSpinner';

interface QuestionFormTags {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  allTags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setAllTags: React.Dispatch<React.SetStateAction<string[]>>;
  title: string;
  onTitleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  content: string;
  onContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  tags: string[];
  error: string;
  submitLoading: boolean;
}

export default function QuestionForm(props: QuestionFormTags) {
  const {
    onSubmit,
    allTags,
    setTags,
    setAllTags,
    title,
    onTitleChange,
    content,
    onContentChange,
    tags,
    error,
    submitLoading,
  } = props;

  const getOptionTags = () => {
    return allTags.map((tag) => ({ name: tag, value: tag }));
  };

  const onSelectTag = (tag: SelectedOptionValue | SelectedOptionValue[]) => {
    if (typeof tag === 'string') {
      setTags((value) => [...value, tag]);
      setAllTags((value) => value.filter((item) => item !== tag));
    }
  };

  const removeTag = (tag: string) => {
    setTags((value) => value.filter((item) => item !== tag));
    setAllTags((value) => [...value, tag]);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          minLength={3}
          maxLength={200}
          type="text"
          placeholder="Enter title"
          value={title}
          disabled={!onTitleChange}
          onChange={onTitleChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Content</Form.Label>
        <Form.Control
          minLength={3}
          maxLength={10000}
          as="textarea"
          rows={8}
          placeholder="Enter content"
          value={content}
          onChange={onContentChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label className="mb-0">Tags</Form.Label>
        <Form.Text className="d-block text-muted">
          Add up to 5 tags to describe what your question is about
        </Form.Text>
        <div className="d-flex flex-row mb-1">
          {tags.map((tag) => (
            <div
              key={tag}
              className="me-1 w-fit-content border rounded p-1 d-flex flex-row"
            >
              <div className="me-1">{tag}</div>
              <CloseButton onClick={() => removeTag(tag)} />
            </div>
          ))}
        </div>
        <SelectSearch
          options={getOptionTags()}
          search
          placeholder="Tags"
          filterOptions={fuzzySearch}
          onChange={onSelectTag}
          disabled={tags.length === 5}
        />
      </Form.Group>
      {error ? (
        <Alert className="w-fit-content p-1 mb-2" variant="danger">
          {error}
        </Alert>
      ) : null}
      <div className="d-flex justify-content-end">
        {submitLoading ? (
          <LoadingSpinner />
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </div>
      <Content className="mt-2" content={content} />
    </Form>
  );
}
