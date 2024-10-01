import { z } from "zod";

function LearnZod() {
  const User = z.object({
    username: z.string(),
  });
  User.parse({username: "zig"})

  type User = z.infer<typeof User>;
  console.log(User);

  return <div>LearnZod</div>;
}

export default LearnZod;
 