

import React from "react";
import ReactDOM from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
  useMutation
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AddPostComponent />
    </QueryClientProvider>
  );
}

function AddPostComponent() {
  const { mutate, isLoading, error } = useMutation(
    (post) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }),
    {
      onSuccess: async (data) => {
        alert("Post added successfully: " + JSON.stringify(await data.json()));
      },
      onError: (error) => {
        console.log(error);
      }
    }
  );

  return (
    <div>
      {isLoading ? (
        <div>Adding Post...</div>
      ) : (
        <button
          onClick={() =>
            mutate({
              title: "foo",
              body: "bar",
              userId: 1
            })
          }
        >
          Add Post
        </button>
      )}
      {error && <div>An error occurred: {error.message}</div>}
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.createRoot(rootElement).render(<App />);
