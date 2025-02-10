import ProfileForm from "@/components/profile-form";

export default function CreateProfile() {
  return (
    <div className="w-full flex flex-col items-center mt-10">
        <h1>Want to apply to a job? Create your profile to increase your chances!</h1>
        <ProfileForm />
    </div>
  )
}