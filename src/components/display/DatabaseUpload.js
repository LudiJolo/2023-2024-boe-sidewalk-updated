import { createSidewalk as createSidewalkMutation } from "../../graphql/mutations";
import {API} from "aws-amplify"

async function createSW(sidewalk_obj) {
    await API.graphql({
        query: createSidewalkMutation,
        variables: {input: sidewalk_obj},
    })
}

export {createSW};