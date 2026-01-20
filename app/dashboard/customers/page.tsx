import {fetchFilteredCustomers} from '@/app/lib/data';
import {Suspense} from 'react';
import {InvoicesTableSkeleton} from '@/app/ui/skeletons';
import CustomersTable from '@/app/ui/customers/table';

export const metadata = { 
    title: 'Customers',
};
export default async function Page({
    searchParams,
}: {
    searchParams: {
        query?: string};
}) {
    const query = searchParams?.query || '';
    const customers = await fetchFilteredCustomers(query);

    return(
        <main>
            <Suspense fallback={<InvoicesTableSkeleton />}>
                <CustomersTable customers = {customers} />
            </Suspense>
        </main>
    )
}