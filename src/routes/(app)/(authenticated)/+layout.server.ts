import { error } from '@sveltejs/kit';

export const load = async ({locals, parent}) => {
    const { user } = await parent();

    if (!user) {
        error(401, 'You must be logged in to add a tool.');
    }
};