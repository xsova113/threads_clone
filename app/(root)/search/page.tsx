import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserCard from "@/components/cards/UserCard";
import SearchBar from "@/components/forms/SearchBar";

const SearchPage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch users
  const result = await fetchUsers({
    userId: user.id,
    pageNumber: 1,
    pageSize: 25,
    searchString: "",
    sortBy: "desc",
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* Search Bar */}
      <SearchBar type={"users"} />

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
