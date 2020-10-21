using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Utilities
{
    public class CommonConnection
    {
        private string ConnectionType = "";
        public DatabaseType DatabaseType { get; set; }
        public bool IsConfigureDb { get; set; }
        private string _connectionString = "";
        public string ConnectionString { get; set; }

        public DatabaseProvider Provider { get; set; }
        bool isDbConnection { get; set; }

        private DbCommand dbCommand;
        private DbConnection dbConnection;
        private IsolationLevel rIsolationLevel;
        private bool isIsolation { get; set; }
        private DbTransaction dbTransaction;

        public CommonConnection()
        {
            string connectionString = "SqlConnectionString";

            if (ConfigurationManager.AppSettings != null)
            {
                var connectionType = ConfigurationManager.AppSettings["DataBaseType"];
                if (!string.IsNullOrEmpty(connectionType))
                {
                    ConnectionType = connectionType.Trim();
                }

            }
            if (ConnectionType != null && ConnectionType == "SQL")
            {
                ConnectionStringSettingsCollection connections = ConfigurationManager.ConnectionStrings;
                _connectionString = connections[connectionString].ConnectionString;
                DatabaseType = DatabaseType.SQL;

                dbConnection = new SqlConnection(connections[connectionString].ConnectionString);
                dbCommand = dbConnection.CreateCommand();
                IsConfigureDb = true;

            }
            else if (ConnectionType != null && ConnectionType == "MySql")
            {

                //this.DatabaseType = DatabaseType.MySql;
                //dbConnection = new SqlConnection(connections[ConnectionString].ConnectionString);
                //IsConfigureDb = true;


            }
            //else if (ConnectionType != null && ConnectionType == "Oracle")
            //{
            //    ConnectionStringSettingsCollection connections = ConfigurationManager.ConnectionStrings;
            //    _connectionString = connections[_connectionString].ConnectionString;
            //    DatabaseType = DatabaseType.Oracle;
            //    dbConnection = new OracleConnection(_connectionString);
            //    dbCommand = dbConnection.CreateCommand();


            //}
            else
            {
                IsConfigureDb = false;
            }
            ConnectionString = _connectionString;
        }

        public CommonConnection(string oleDbDataSource)
        {
            var xlConString = ConfigurationManager.AppSettings["XLConnectionString"];
            //string strConn = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + odbcDataSource + ";Extended Properties=Excel 12.0;";
            string strConn = string.Format(xlConString, oleDbDataSource);

            dbConnection = new OleDbConnection();
            dbConnection.ConnectionString = strConn;
            DatabaseType = DatabaseType.OleDb;
        }

        public CommonConnection(IsolationLevel readCommitted)
        {

            rIsolationLevel = readCommitted;
            isIsolation = true;

            if (ConfigurationManager.AppSettings != null)
            {
                var connectionType = ConfigurationManager.AppSettings["DataBaseType"];
                if (!string.IsNullOrEmpty(connectionType))
                {
                    ConnectionType = connectionType.Trim();
                }

            }
            if (ConnectionType != null && ConnectionType == "SQL")
            {
                ConnectionStringSettingsCollection connections = ConfigurationManager.ConnectionStrings;
                _connectionString = "SqlConnectionString";
                DatabaseType = DatabaseType.SQL;
                dbConnection = new SqlConnection(connections[_connectionString].ConnectionString);
                dbCommand = dbConnection.CreateCommand();

                IsConfigureDb = true;

            }

            //else if (ConnectionType != null && ConnectionType == "Oracle")
            //{

            //    ConnectionStringSettingsCollection connections = ConfigurationManager.ConnectionStrings;
            //    _connectionString = connections[_connectionString].ConnectionString;
            //    DatabaseType = DatabaseType.Oracle;
            //    dbConnection = new OracleConnection(_connectionString);
            //    dbCommand = dbConnection.CreateCommand();

            //    IsConfigureDb = true;


            //}
            else
            {
                IsConfigureDb = false;
            }
        }

        public CommonConnection(bool isDbConnection)
        {

            this.isDbConnection = isDbConnection;


            if (ConfigurationManager.AppSettings != null)
            {
                var connectionType = ConfigurationManager.AppSettings["DataBaseType"];
                if (!string.IsNullOrEmpty(connectionType))
                {
                    ConnectionType = connectionType.Trim();
                }

            }
            if (ConnectionType != null && ConnectionType == "SQL")
            {
                ConnectionStringSettingsCollection connections = ConfigurationManager.ConnectionStrings;
                _connectionString = "SqlConnectionString";
                DatabaseType = DatabaseType.SQL;
                dbConnection = new SqlConnection(connections[_connectionString].ConnectionString);
                dbCommand = dbConnection.CreateCommand();
                IsConfigureDb = true;

            }

            //else if (ConnectionType != null && ConnectionType == "Oracle")
            //{
            //    _connectionString = "OracleConnectionString";
            //    ConnectionStringSettingsCollection connections = ConfigurationManager.ConnectionStrings;
            //    DatabaseType = DatabaseType.Oracle;
            //    dbConnection = new OracleConnection(connections[_connectionString].ConnectionString);
            //    dbCommand = dbConnection.CreateCommand();

            //    IsConfigureDb = true;


            //}
            else
            {
                IsConfigureDb = false;
            }
        }




        public void ExecuteNonQuery(string sql)
        {
            ExecuteDbCommand(sql);

        }



        public void RollBack()
        {
            dbTransaction.Rollback();
        }

        public void Close()
        {
            if (dbConnection.State == ConnectionState.Open)
                dbConnection.Close();

            dbCommand.Dispose();
            if (dbTransaction != null)
            {
                dbTransaction.Dispose();
            }



        }





        public void BeginTransaction()
        {
            if (dbConnection.State == ConnectionState.Closed)
            {
                dbConnection.Open();
            }

            dbTransaction = dbConnection.BeginTransaction(rIsolationLevel);
            dbCommand = dbConnection.CreateCommand();
            dbCommand.Transaction = dbTransaction;
        }



        public void CommitTransaction()
        {
            dbTransaction.Commit();

        }

        public DataTable GetDataTable(string sql)
        {
            DataTable returnDT = new DataTable();

            DbDataAdapter adapter = new SqlDataAdapter(sql, _connectionString);

            adapter.Fill(returnDT);
            adapter.Dispose();

            return returnDT;
        }

        public DataSet GetDataSet(string sql)
        {
            DataSet returnDT = new DataSet();
            DbDataAdapter adapter = new SqlDataAdapter(sql, _connectionString);
            adapter.Fill(returnDT);
            adapter.Dispose();

            return returnDT;
        }

        public DataTable GetDataTable(string sql, int minute)
        {
            DataTable returnDT = new DataTable();

            SqlConnection com = new SqlConnection(dbConnection.ConnectionString);
            SqlCommand cmd = new SqlCommand(sql, com);
            cmd.CommandTimeout = minute * 60 * 1000;
            cmd.CommandType = CommandType.Text;
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);

            adapter.Fill(returnDT);


            return returnDT;
        }



        public int GetScaler(string sql)
        {
            if (dbConnection.State == ConnectionState.Closed)
                dbConnection.Open();
            dbCommand.CommandText = sql;
            int returnCount = 0;
            switch (DatabaseType)
            {
                case DatabaseType.SQL:
                    returnCount = Convert.ToInt32(dbCommand.ExecuteScalar());
                    break;

            }
            if (dbConnection.State == ConnectionState.Open)
                dbConnection.Close();
            return returnCount;
        }

        public List<T> Data<T>(string query)
        {

            DataTable dataTable = GetDataTable(query);

            var objData = (List<T>)ListConversion.ConvertTo<T>(dataTable);
            return objData;

        }
        public List<T> Data<T>(string query, int minute)
        {

            DataTable dataTable = GetDataTable(query, minute);

            var objData = (List<T>)ListConversion.ConvertTo<T>(dataTable);
            return objData;

        }


        public List<T> GenericDataSource<T>(string query)
        {

            DataTable dataTable = GetDataTable(query);

            var objData = (List<T>)GenericListGenerator.GetList<T>(dataTable);
            return objData;

        }

        public int ExecuteAfterReturnId(string query, string columnName)
        {


            switch (DatabaseType)
            {
                case DatabaseType.SQL:
                    return ExcuteSqlAfterReturn(query);
                    break;
                case DatabaseType.MySql:
                    return 0;
                    break;
                //case DatabaseType.Oracle:
                //    return ExcuteOracleAfterReturn(query, columnName);
                //    break;
                default:
                    return 0;
            }

        }


        private int ExcuteSqlAfterReturn(string query)
        {
            int rvId = 0;

            try
            {
                //dbCommand = dbConnection.CreateCommand();
                //dbCommand.Transaction = dbTransaction;
                if (dbConnection.State == ConnectionState.Closed)
                {
                    dbConnection.Open();
                }
                dbCommand.CommandText = query + " select @@identity outId ";

                var data = dbCommand.ExecuteScalar();


                if (data != null)
                {
                    rvId = Convert.ToInt32(data);
                }
                else
                {
                    throw new Exception("Return value is null");
                }


            }
            catch (Exception e)
            {
                throw new Exception(e.Message);


            }
            return rvId;
        }


        //private int ExcuteOracleAfterReturn(string query, string columnName)
        //{
        //    int rvId = 0;

        //    try
        //    {
        //        query = query + " returning " + columnName + " into :outId";

        //        DbParameter p2 = new OracleParameter("outId", OracleType.Int32);
        //        p2.Direction = ParameterDirection.Output;
        //        dbCommand = dbConnection.CreateCommand();
        //        dbCommand.Transaction = dbTransaction;
        //        dbCommand.CommandText = query;
        //        dbCommand.Parameters.Add(p2);
        //        dbCommand.ExecuteNonQuery();
        //        //dbTransaction.Commit();

        //        rvId = Convert.ToInt32(dbCommand.Parameters[0].Value);

        //    }
        //    catch (Exception e)
        //    {
        //        throw new Exception(e.Message);


        //    }
        //    return rvId;
        //}

        private int ExcuteSqlAfterReturn(string query, string columnName)
        {
            int rvId = 0;

            try
            {
                query = query + " select @@identity as outId ";

                DbParameter p2 = new SqlParameter("outId", SqlDbType.Int);
                p2.Direction = ParameterDirection.ReturnValue;

                dbCommand = dbConnection.CreateCommand();
                dbCommand.Transaction = dbTransaction;
                dbCommand.Parameters.Add(p2);
                dbCommand.CommandText = query;
                dbCommand.ExecuteNonQuery();
                //dbTransaction.Commit();

                rvId = Convert.ToInt32(dbCommand.Parameters[0].Value);

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);


            }
            return rvId;
        }

        private void ExecuteDbCommand(string sqlTxt)
        {

            dbCommand = dbConnection.CreateCommand();
            dbCommand.CommandText = sqlTxt;
            dbCommand.Connection = dbConnection;
            if (dbTransaction != null)
            {
                dbCommand.Transaction = dbTransaction;
            }
            if (dbConnection.State == ConnectionState.Closed)
                dbConnection.Open();
            dbCommand.ExecuteNonQuery();
            if (dbTransaction == null)
            {
                dbCommand.Dispose();
                dbConnection.Close();
                dbConnection.Dispose();
            }

        }

        public DataTable GetXLDataTable()
        {
            if (dbConnection.State == ConnectionState.Closed)
            {
                dbConnection.Open();
            }
            dbCommand = new OleDbCommand("SELECT * FROM [Sheet1$]");
            dbCommand.Connection = dbConnection;
            DataTable dt = new DataTable();
            dt.Load(dbCommand.ExecuteReader());
            dbConnection.Close();
            return dt;
        }
        /// <summary>
        /// Get XL DATA TABLE OF SPECIFIC SHEET NAME
        /// </summary>
        /// <param name="sheetName">SHEET NAME</param>
        /// <returns></returns>
        public DataTable GetXLDataTable(string sheetName)
        {
            if (dbConnection.State == ConnectionState.Closed)
            {
                dbConnection.Open();
            }
            dbCommand = new OleDbCommand("SELECT * FROM [" + sheetName + "$]");
            dbCommand.Connection = dbConnection;
            DataTable dt = new DataTable();
            dt.Load(dbCommand.ExecuteReader());
            dbConnection.Close();
            return dt;
        }

        public object GetScalerObject(string commandText)
        {
            if (dbConnection.State == ConnectionState.Closed)
                dbConnection.Open();
            dbCommand.CommandText = commandText;
            object returnCount = null;
            switch (DatabaseType)
            {
                case DatabaseType.SQL:
                    returnCount = dbCommand.ExecuteScalar();
                    break;

            }
            if (returnCount == DBNull.Value)
                returnCount = "";
            if (dbConnection.State == ConnectionState.Open)
                dbConnection.Close();
            return returnCount;
        }

    }
}