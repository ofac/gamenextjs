export default function Loading() {

  // Stack uses React Suspense, which will render this page while user data is being fetched.
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
  return <div className="min-h-dvh flex justify-center items-center">
          <span className="loading loading-spinner loading-xl" style={{zoom: 2.4}}></span>
        </div>;
}
