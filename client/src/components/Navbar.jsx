export default function Navbar() {
  const avatarUrl = "";
  return (
    <nav className="h-14 bg-blue-600 text-white flex items-center justify-between px-4 shadow-md">
      <h1 className="font-bold text-xl">AI Interview Prep</h1>
      <div className="flex items-center space-x-4">
        <span className="hidden sm:block">Hi, User 👋</span>
        <img
          src={avatarUrl || "https://via.placeholder.com/32"}
          alt="avatar"
          className="w-8 h-8 rounded-full border border-white object-cover"
        />
      </div>
    </nav>
  );
}
