// Calculate distance between two points
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Determine the closest path segment to a given point
function getClosestPathSegment(productX, productY, paths) {
    let closestSegment = null;
    let shortestDistance = Infinity;

    paths.forEach((path, pathIndex) => {
        for (let i = 0; i < path.length - 1; i++) {
            const point1 = path[i];
            const point2 = path[i + 1];
            const distance = Math.min(
                getDistance(productX, productY, point1.x, point1.y),
                getDistance(productX, productY, point2.x, point2.y)
            );
            if (distance < shortestDistance) {
                shortestDistance = distance;
                closestSegment = pathIndex;
            }
        }
    });

    return closestSegment;
}
