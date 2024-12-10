import Signup from "@/components/auth/signup"


export default function SignupPage() {
  return (
    <div className="bg-black inset-0 flex justify-center items-center"  style={{'minHeight': 'calc(100vh - 3.23rem)'}}>
      <div className="form-container mx-auto bg-black border border-gray-800  w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] max-w-[25rem] px-6 py-8 my-14 rounded-xl">
          <div className="space-y-2 text-center mb-4">
              <h1 className="text-2xl font-semibold text-white tracking-tight">Create Your Account.</h1>
              <p className="text-sm text-gray-400">Enter your detals to get started.</p>
          </div>
          <Signup />
      </div>
    </div>
  )
}