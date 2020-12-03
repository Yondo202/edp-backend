exports.paginate = function(query){
      return {
        page: parseInt(query.page) ||1,
        paginate:parseInt(query.pageSize) || 50, 
    };
};