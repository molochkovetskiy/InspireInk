import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Post from "./Post";

const Feed = () => {
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, [2600]);

    return (
        <Box flex={4} p={{ xs: 0, md: 2 }}>
            <Post />
            {loading &&
                <>
                    <Stack spacing={1}>
                        <Skeleton variant="text" height={60} />
                        <Skeleton variant="text" height={20} />
                        <Skeleton variant="rectangular" height={300} />
                    </Stack>
                    <Stack spacing={1}>
                        <Skeleton variant="text" height={60} />
                        <Skeleton variant="text" height={20} />
                        <Skeleton variant="rectangular" height={300} />
                    </Stack>
                </>
            }
        </Box>
    );
};

export default Feed;