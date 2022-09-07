import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import useDebounce from "../hooks/useDebounce";
import useFormFields from "../hooks/useFormFields";

const CreateLink: NextPage = () => {
  const homeUrl = location.origin;
  const { inputs, handleInputChange, handleReset } = useFormFields({
    slug: "",
    url: "",
  });
  const debouncedSearchQuery = useDebounce(inputs.slug, 400);
  const checkIfSlugExists = trpc.useQuery(
    ["example.checkSlug", { slug: debouncedSearchQuery }],
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const mutation = trpc.useMutation(["example.createShortLink"]);

  const handleCreateSlug = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    mutation.mutate(inputs);
    checkIfSlugExists.refetch();
    handleReset();
  };

  return (
    <>
      <form onSubmit={handleCreateSlug}>
        {checkIfSlugExists.data?.used ? (
          <span style={{ color: "red" }}>This link has already been used</span>
        ) : (
          <span>
            {homeUrl}/{inputs.slug}{" "}
          </span>
        )}
        <br />
        <input
          type="text"
          id="slug"
          maxLength={30}
          value={inputs.slug}
          placeholder="slug"
          onChange={handleInputChange}
          title="Only alphanumeric characters allowed. No spaces or special characters"
        />
        <button
          type="button"
          value="random"
          onClick={() => console.log("generate random slug")}
        >
          Random
        </button>
        {mutation.error && (
          <p>
            Something went wrong!{" "}
            {JSON.parse(mutation.error.message)[0].message}
          </p>
        )}
        <br />

        <input
          style={{ marginTop: "1rem" }}
          id="url"
          type="url"
          required
          maxLength={600}
          value={inputs.url}
          placeholder="http://google.com"
          onChange={handleInputChange}
        />
        <br />
        <span>Link</span>
        <br />
        <button disabled={mutation.isLoading || checkIfSlugExists.data?.used}>
          Create
        </button>
      </form>
    </>
  );
};

export default CreateLink;
