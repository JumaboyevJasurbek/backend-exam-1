const http = require("http");
const { read, write } = require("./util/FS");
const fs = require("fs");
const path = require("path");

const options = {
  "Content-Type": "application/json",
};

const server = http.createServer((req, res) => {
  const branchesStr = JSON.stringify(read("branches.json"));
  const allBranches = JSON.parse(branchesStr);

  const productsStr = JSON.stringify(read("products.json"));
  const allProducts = JSON.parse(productsStr);

  const workersStr = JSON.stringify(read("workers.json"));
  const allWorkers = JSON.parse(workersStr);

  const marketsStr = JSON.stringify(read("markets.json"));
  const allMarkets = JSON.parse(marketsStr);

  if (req.method == "GET") {
    if (req.url == "/markets") {
      res.writeHead(200, options);
      res.end(JSON.stringify(read("markets.json")));
    }

    //
    //
    //

    let params = req.url.split("/")[2];

    if (req.url.split("/")[1] == "market") {
      const branchesId = allBranches.filter((e) => e.id == params);

      const productsId = allProducts.filter((e) => e.id == params);

      const workersId = allWorkers.filter((e) => e.id == params);

      const filteredMarket = allMarkets.filter((e) =>
        e.id == params ? (e.branches = branchesId) : null
      );

      const filteredMarket1 = allBranches.filter((e) =>
        e.id == params ? (e.products = productsId) : null
      );

      const filteredMarket2 = allBranches.filter((e) =>
        e.id == params ? (e.workers = workersId) : null
      );

      console.log(filteredMarket1);
      res.writeHead(200, options);
      res.end(JSON.stringify(filteredMarket));

      return;
    }

    //
    //
    //

    if (req.url == "/branches") {
      res.writeHead(200, options);
      res.end(JSON.stringify(read("branches.json")));
    }

    //
    //

    if (req.url.split("/")[1] == "branch") {
      // const MarketsId = allMarkets.filter((e) => e.id == params);

      const productsId = allProducts.filter((e) => e.id == params);

      const workersId = allWorkers.filter((e) => e.id == params);

      const marketsId = allMarkets.filter((e) => e.id == params);

      const filteredBranches = allBranches.filter((e) =>
        e.id == params ? (e.markets = marketsId) : null
      );

      const filteredBranches1 = allBranches.filter((e) =>
        e.id == params ? (e.products = productsId) : null
      );

      const filteredBranches2 = allBranches.filter((e) =>
        e.id == params ? (e.workers = workersId) : null
      );

      console.log(filteredBranches1);
      res.writeHead(200, options);
      res.end(JSON.stringify(filteredBranches));

      return;
    }

    //
    //

    if (req.url == "/products") {
      res.writeHead(200, options);
      res.end(JSON.stringify(read("products.json")));
    }

    //
    //

    if (req.url.split("/")[1] == "product") {
      const branchesId = allBranches.filter((e) => e.id == params);

      const marketsId = allMarkets.filter((e) => e.id == params);

      const filteredProducts1 = allProducts.filter((e) =>
        e.id == params ? (e.branches = branchesId) : null
      );

      const filteredProducts = allProducts.filter((e) =>
        e.id == params ? (e.markets = marketsId) : null
      );

      console.log(filteredProducts1);
      res.writeHead(200, options);
      res.end(JSON.stringify(filteredProducts));

      return;
    }

    //
    //

    if (req.url == "/workers") {
      res.writeHead(200, options);
      res.end(JSON.stringify(read("workers.json")));
    }

    if (req.url.split("/")[1] == "worker") {
      const branchesId = allBranches.filter((e) => e.id == params);

      const marketsId = allMarkets.filter((e) => e.id == params);

      const filteredWorkers = allWorkers.filter((e) =>
        e.id == params ? (e.markets = marketsId) : null
      );

      const filteredWorkers1 = allWorkers.filter((e) =>
        e.id == params ? (e.branches = branchesId) : null
      );

      console.log(filteredWorkers1);
      res.writeHead(200, options);
      res.end(JSON.stringify(filteredWorkers));

      return;
    }
  }

  // POSTS
  // POSTS

  if (req.method == "POST") {
    if (req.url == "/newMarket") {
      req.on("data", (chunk) => {
        const { name } = JSON.parse(chunk);

        const newMarkets = read("markets.json");
        // console.log(newMarkets);
        newMarkets.push({
          id: newMarkets.at(-1)?.id + 1 || 1,
          name,
        });

        const newMarket = write("markets.json", newMarkets);

        if (newMarket) {
          res.writeHead(201, options);
          res.end(
            JSON.stringify({
              status: 201,
              message: "Markets has been created",
            })
          );
        }
      });
    }

    if (req.url == "/newBranches") {
      req.on("data", (chunk) => {
        const { branches } = JSON.parse(chunk);

        const allBranches = read("branches.json");

        allBranches.push({
          id: allBranches.at(-1)?.id + 1 || 1,
          branches,
        });

        const newBranch = write("branches.json", allBranches);

        console.log(newBranch);

        if (newBranch) {
          res.writeHead(201, options);
          res.end(
            JSON.stringify({
              status: 201,
              message: "Branches has been created",
            })
          );
        }
      });
    }
    if (req.url == "/newProducts") {
      req.on("data", (chunk) => {
        const { name, price } = JSON.parse(chunk);

        const newProducts = read("products.json");

        newProducts.push({
          id: newProducts.at(-1)?.id + 1 || 1,
          name,
          price,
        });

        const newProduct = write("products.json", newProducts);

        if (newProduct) {
          res.writeHead(201, options);
          res.end(
            JSON.stringify({
              status: 201,
              message: "Products has been created",
            })
          );
        }
      });
    }
    if (req.url == "/newWorkers") {
      req.on("data", (chunk) => {
        const { name, salary, experience } = JSON.parse(chunk);

        const newWorkers = read("workers.json");

        newWorkers.push({
          id: newWorkers.at(-1)?.id + 1 || 1,
          name,
          salary,
          experience,
        });

        const newWorker = write("workers.json", newWorkers);

        if (newWorker) {
          res.writeHead(201, options);
          res.end(
            JSON.stringify({ status: 201, message: "Workers has been created" })
          );
        }
      });
    }
  }

  //   PUT
  //   PUT

  if (req.method == "PUT") {
    let params = req.url.split("/")[2];

    if (req.url.split("/")[1] == "updateMarkets") {
      req.on("data", (chunk) => {
        const { name } = JSON.parse(chunk);
        const updatedMarkets = {
          id: params,
          name,
        };
        const foundMarket = allMarkets.map((e) =>
          e.id == params ? updatedMarkets : e
        );
        write("markets.json", foundMarket);
        res.writeHead(201, options);
        res.end(
          JSON.stringify({
            status: 201,
            message: "Market has been updated",
          })
        );
      });
    }
    if (req.url.split("/")[1] == "updateBranches") {
      req.on("data", (chunk) => {
        const { branches, marketId } = JSON.parse(chunk);
        const updatedBranches = {
          id: params,
          branches,
          marketId,
        };
        const foundBranches = allBranches.map((e) =>
          e.id == params ? updatedBranches : e
        );
        write("branches.json", foundBranches);
        res.writeHead(201, options);
        res.end(
          JSON.stringify({
            status: 201,
            message: "Branches has been updated",
          })
        );
      });
    }
    if (req.url.split("/")[1] == "updateWorkers") {
      req.on("data", (chunk) => {
        const { name, salary, experience, branchesId } = JSON.parse(chunk);
        const updatedWorkers = {
          id: params,
          name,
          salary,
          experience,
          branchesId,
        };
        const foundWorkers = allWorkers.map((e) =>
          e.id == params ? updatedWorkers : e
        );
        write("workers.json", foundWorkers);
        res.writeHead(201, options);
        res.end(
          JSON.stringify({
            status: 201,
            message: "Workers has been updated",
          })
        );
      });
    }
    if (req.url.split("/")[1] == "updateProducts") {
      req.on("data", (chunk) => {
        const { name, price, branchesId } = JSON.parse(chunk);
        const updatedProducts = {
          id: params,
          name,
          price,
          branchesId,
        };
        const foundProducts = allProducts.map((e) =>
          e.id == params ? updatedProducts : e
        );
        write("products.json", foundProducts);
        res.writeHead(201, options);
        res.end(
          JSON.stringify({
            status: 201,
            message: "Products has been updated",
          })
        );
      });
    }
  }

  // Delete
  // Delete
  let params = req.url.split("/")[2];

  if (req.method == "DELETE") {
    if (req.url.split("/")[1] == "deleteMarket") {
      const deleteMarket = allMarkets.filter((e) => e.id != params);
      write("markets.json", deleteMarket);

      const deleteBranches = allBranches.filter((e) => e.marketId != params);
      write("branches.json", deleteBranches);

      const deleteWorks = allWorkers.filter((e) => e.branchesId != params);
      write("workers.json", deleteWorks);

      const deleteProducts = allProducts.filter((e) => e.branchesId != params);
      write("products.json", deleteProducts);

      res.writeHead(200, options);
      res.end(
        JSON.stringify({
          status: 200,
          message: "Market has been deleted",
        })
      );
    }
  }
});
server.listen(8000, console.log(8000));
