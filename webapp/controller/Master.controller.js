sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"br/com/sales/SalesOrderApproval/util/Formatter",
	"br/com/sales/SalesOrderApproval/util/Grouper"
], function (Controller, Formatter, Grouper) {
	"use strict";
	return Controller.extend("br.com.sales.SalesOrderApproval.controller.Master", {
		Formatter: Formatter,
		Grouper: Grouper,

		onInit: function () {

		},

		handleListItemPress: function (evt) {
			var salesOrderID = evt.getSource().getBindingContext().getProperty("SalesOrderID");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			oRouter.navTo("Detail", { // nome do Router
				orderID: salesOrderID // Parametro do routing
			});
		},

		/**
		 *@memberOf br.com.sales.SalesOrderApproval.controller.Master
		 */
		handleSearch: function (oEvent) {
			//var filters = [];
			var query = oEvent.getSource().getValue();
			var filter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("SalesOrderID", sap.ui.model.FilterOperator.Contains, query),
					new sap.ui.model.Filter("CustomerName", sap.ui.model.FilterOperator.Contains, query)
				],
				and: false
			});
			var list = this.getView().byId("list0");
			var binding = list.getBinding("items");
			binding.filter(filter);
		},
		/**
		 *@memberOf br.com.sales.SalesOrderApproval.controller.Master
		 */
		handleGroup: function (oEvent) {
			var sorters = [];
			var item = oEvent.getParameter("selectedItem");
			var key = (item) ? item.getKey() : null;

			if (key === "GrossAmount" || key === "LifecycleStatus") {
				Grouper.bundle = this.getView().getModel("i18n").getResourceBundle();
				var grouper = Grouper[key];
				sorters.push(new sap.ui.model.Sorter(key, true, grouper));
			}
			var list = this.getView().byId("list0");
			var binding = list.getBinding("items");
			binding.sort(sorters);
		}
	});
});