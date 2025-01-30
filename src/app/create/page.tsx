import JobForm from "@/components/job-form";

export default function Create() {
  return (
    <div className="w-full flex flex-col items-center mt-10">
        <h1>Create a job</h1>

        <JobForm />
        
    </div>
  )
}