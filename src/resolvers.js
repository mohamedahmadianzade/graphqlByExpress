const resolvers = {
    Query: {
        users: (_,__,context) => {
            console.log("accessToken:" , context.accessToken);
            return [{
                userId: "1", password: "1", username: "test", name: "test"
            }]
        }
    }
}
export default resolvers
