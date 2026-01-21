
import React from 'react';

const Admin: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-black text-white">ADMIN CONSOLE</h2>
        <button className="px-6 py-2 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-all">
          + ADD NEW QUESTION
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Nav */}
        <div className="lg:col-span-1 space-y-2">
          {['Content Management', 'User Moderation', 'Reports', 'Game Analytics', 'Site Settings'].map(item => (
            <button key={item} className="w-full text-left p-4 rounded-2xl glass border-white/5 hover:bg-white/10 transition-all font-bold text-sm">
              {item}
            </button>
          ))}
        </div>

        {/* Right Column: Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-8 glass rounded-[40px] border-white/5">
            <h3 className="text-xl font-bold mb-6">Recent Content Submissions</h3>
            <div className="overflow-hidden border border-white/5 rounded-2xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="p-4">Question</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[1,2,3,4,5].map(i => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">Sample question text for item {i} of the quiz database...</td>
                      <td className="p-4">Science</td>
                      <td className="p-4"><span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold uppercase">Active</span></td>
                      <td className="p-4 text-right space-x-2">
                        <button className="text-indigo-400 hover:underline">Edit</button>
                        <button className="text-red-400 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
