import * as cookie from 'cookie'
import { POST_SERVER } from './ip';

export type UserData = {
    usersName: string,
    usersRName: string,
    usersEmail: string,
    usersHash: string
}

export default async function checkUser(context: any) {
    if (!context.req.headers.cookie) {
        return {error: true};
    }
      const parsedCookies = cookie.parse(context.req.headers.cookie);
      if (!parsedCookies.G_DASH) {
        return {error: true};
      }

      let fetchUserJSON;
      try {
        const fetchUser = await fetch(`${POST_SERVER}validate`, {headers: {"Authentication": `Bearer ${parsedCookies.G_DASH}`}});
        fetchUserJSON = await fetchUser.json();
      } catch (err) {
        return {error: true};
      }
      if (fetchUserJSON.error) {
        console.log(fetchUserJSON);
        return {error: true}
      }
      return {data: fetchUserJSON.userData as UserData, cookie: parsedCookies.G_DASH}
}