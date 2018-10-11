const { getProducts } = require('./src/services/product-service');

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it


exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
    const { createNode } = actions;
    try {
        const res = await getProducts();

        res.data
            .filter(product => product.features)
            .map((product, i) => {
                const nodeContent = JSON.stringify(product);
                const node = {
                    id: product._id,
                    parent: null,
                    internal: {
                        type: 'Product',
                        content: nodeContent,
                        contentDigest: createContentDigest(nodeContent)
                    },
                    children: [], 
                    features: product.features,
                    name: product.name,
                    category: product.category
                };
            
            createNode(node);

                return;

            });
    } catch (e) {
        console.log(e);
    }
}