export default function CompanyTable({ data }) {
    return (
      <div className="bg-white p-4 rounded shadow mt-6">
        <h3 className="text-lg font-semibold mb-4">Company Data</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Rank</th>
              <th className="p-2">Company</th>
              <th className="p-2">Market Cap</th>
              <th className="p-2">Country</th>
              <th className="p-2">Sector</th>
              <th className="p-2">Industry</th>
            </tr>
          </thead>
          <tbody>
            {data.map((company, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-2">{company.Rank}</td>
                <td className="p-2">{company.Company}</td>
                <td className="p-2">${company["Market Cap"]}</td>
                <td className="p-2">{company.Country}</td>
                <td className="p-2">{company.Sector}</td>
                <td className="p-2">{company.Industry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  