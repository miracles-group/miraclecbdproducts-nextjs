import React from "react";
import Layout from "../layout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Noty from "noty";
import { Sync } from "@material-ui/icons";
import {
  getProduct,
  getSetting,
  setting,
  createProduct,
  autoSync
} from "../services/products";
import "../styles/index.scss";
import "../node_modules/noty/lib/noty.css";
import "../node_modules/noty/lib/themes/mint.css";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 20,
      autoSyncProduct: props.setting,
      loading: true,
      syncLoading: false,
      product: []
    };
  }
  static async getInitialProps({ req, res, pathname }) {
    let data = null;
    let setting = null;
    const listProduct = await getProduct();
    if (listProduct != undefined) {
      data = listProduct.data;
    }
    const resSetting = await getSetting();
    if (resSetting != undefined) {
      setting = resSetting.data.autoSyncProduct;
    }
    return { data, setting, pathname };
  }
  componentDidUpdate() {
    if (this.props.url.asPath !== "/") {
      const _domain = window.location.origin;
      const _url = this.props.url.asPath;
      const path = _domain + _url;
      const url = new URL(path);
      const shopName = url.searchParams.get("shop");
      localStorage.setItem("shopUrl", shopName);
    }
  }
  componentDidMount() {
    this.setState({
      loading: false
    });
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: +event.target.value,
      page: 0
    });
  };

  changeSync = e => {
    this.setState(
      {
        autoSyncProduct: e.target.checked
      },
      () => this.onSetting()
    );
  };

  onSetting = async () => {
    const res = await setting({ autoSyncProduct: this.state.autoSyncProduct });
  };

  addProduct = async product => {
    const item = {
      id: product.id,
      title: product.name,
      body_html: product.description,
      vendor: product.slug,
      product_type: product.category,
      tags: product.sub_category,
      variants: [
        {
          price: product.price,
          sku: product.mg_of_cbd
        }
      ],
      images: [
        {
          src: product.image_path
        }
      ]
    };
    const res = await createProduct(item);
    if (res.status === 200) {
      this.onSucces("Sync Product Successfuly");
    } else {
      this.onFail(res.data.message);
    }
  };

  autoSync = async () => {
    this.setState({
      syncLoading: true
    });
    const res = await autoSync();
    if (res.data.status === 200) {
      this.setState(
        {
          syncLoading: false
        },
        () => this.onSucces(res.data.message)
      );
    } else {
      this.onFail(res.data.message);
    }
  };

  onSucces = mess => {
    return new Noty({
      type: "success",
      layout: "topRight",
      text: mess,
      timeout: 3000
    }).show();
  };

  onFail = () => {
    return new Noty({
      type: "error",
      layout: "topRight",
      text: err,
      timeout: 3000
    }).show();
  };

  render() {
    const { page, rowsPerPage, loading } = this.state;
    return (
      <Layout
        btnSync={true}
        autoSync={this.autoSync}
        loading={this.state.syncLoading}
      >
        {!loading && (
          <div>
            <div>
              <input
                type="checkbox"
                checked={this.state.autoSyncProduct}
                onChange={e => this.changeSync(e)}
              />
              <span>Automatically sync after 30 days</span>
            </div>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">#</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Category</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.data.results
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((value, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell align="left">{value.name}</TableCell>
                          <TableCell align="left">
                            {value.sub_category}
                          </TableCell>
                          <TableCell align="left">{value.price}</TableCell>
                          <TableCell value={value} className="actions">
                            <Sync
                              className="add"
                              onClick={() => this.addProduct(value)}
                            ></Sync>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                rowsPerPageOptions={[10, 20, 30]}
                count={this.props.data.results.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                backIconButtonProps={{
                  "aria-label": "previous page"
                }}
                nextIconButtonProps={{
                  "aria-label": "next page"
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        )}
      </Layout>
    );
  }
}

export default Product;
